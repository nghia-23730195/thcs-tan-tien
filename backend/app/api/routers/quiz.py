from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from app.services.physics_data import EXAM_2025_DATA, EXAM_THCS_DATA

router = APIRouter(prefix="/quiz", tags=["Physics Exam Bank 2025"])

class SubmitPart1Item(BaseModel):
    id: str
    selected_option: int

class SubmitPart2Item(BaseModel):
    id: str
    items: Dict[str, bool] # {"a": True, "b": False...}

class SubmitPart3Item(BaseModel):
    id: str
    user_value: float

class FullExamSubmission(BaseModel):
    level: Optional[str] = "thcs"
    part1: List[SubmitPart1Item]
    part2: List[SubmitPart2Item]
    part3: List[SubmitPart3Item]

@router.get("/exam-2025")
def get_exam_2025(level: str = "thcs"):
    """Return exam paper (THCS) without revealing answers."""
    data = EXAM_THCS_DATA
    sanitized_p1 = [
        {"id": q["id"], "question": q["question"], "options": q["options"], "topic": q["topic"]}
        for q in data["part_1_multiple_choice"]
    ]
    sanitized_p2 = [
        {"id": q["id"], "context": q["context"], "items": [{"id": it["id"], "statement": it["statement"]} for it in q["items"]], "topic": q["topic"]}
        for q in data["part_2_true_false"]
    ]
    sanitized_p3 = [
        {"id": q["id"], "question": q["question"], "unit": q["unit"], "topic": q["topic"]}
        for q in data["part_3_short_answer"]
    ]
    return {
        "level": level,
        "title": data["title"],
        "duration_minutes": data["duration_minutes"],
        "part_1": sanitized_p1,
        "part_2": sanitized_p2,
        "part_3": sanitized_p3,
    }

@router.post("/submit-2025")
def grade_exam_2025(sub: FullExamSubmission):
    data = EXAM_THCS_DATA if (sub.level and sub.level.lower() == "thcs") else EXAM_2025_DATA
    p1_answers = {item.id: item.selected_option for item in sub.part1}
    p2_answers = {item.id: item.items for item in sub.part2}
    p3_answers = {item.id: item.user_value for item in sub.part3}

    score_total = 0.0
    max_score = 10.0
    details_p1 = []
    details_p2 = []
    details_p3 = []
    weak_topics = []

    # Grade Part 1: Each question 1.5 pts
    for q in data["part_1_multiple_choice"]:
        user_choice = p1_answers.get(q["id"], -1)
        is_corr = (user_choice == q["correct"])
        if is_corr:
            score_total += 1.5
        else:
            weak_topics.append(q["topic"])
        details_p1.append({
            "id": q["id"],
            "question": q["question"],
            "options": q["options"],
            "user_choice": user_choice,
            "correct": q["correct"],
            "is_correct": is_corr,
            "explanation": q["explanation"]
        })

    # Grade Part 2: Form Bộ GD&ĐT 2025 standard scoring per statement
    for q in data["part_2_true_false"]:
        user_dict = p2_answers.get(q["id"], {})
        sub_items = []
        q_correct_cnt = 0
        for it in q["items"]:
            user_val = user_dict.get(it["id"])
            it_corr = (user_val == it["correct"])
            if it_corr:
                q_correct_cnt += 1
            sub_items.append({
                "id": it["id"],
                "statement": it["statement"],
                "user_choice": user_val,
                "correct_choice": it["correct"],
                "is_correct": it_corr,
                "explanation": it["explanation"]
            })
        # Score calculation: 1 right -> 0.1, 2 right -> 0.25, 3 right -> 0.5, 4 right -> 1.0 (scaled)
        p2_score_map = {0: 0.0, 1: 0.8, 2: 1.8, 3: 2.8, 4: 4.0}
        score_total += p2_score_map.get(q_correct_cnt, 0.0)
        if q_correct_cnt < 4:
            weak_topics.append(q["topic"])
        details_p2.append({
            "id": q["id"],
            "context": q["context"],
            "items": sub_items,
            "correct_count": q_correct_cnt
        })

    # Grade Part 3: Short answer question 3.0 pts
    for q in data["part_3_short_answer"]:
        user_num = p3_answers.get(q["id"])
        is_corr = (user_num is not None and abs(user_num - q["correct_value"]) < 0.01)
        if is_corr:
            score_total += 3.0
        else:
            weak_topics.append(q["topic"])
        details_p3.append({
            "id": q["id"],
            "question": q["question"],
            "user_value": user_num,
            "correct_value": q["correct_value"],
            "unit": q["unit"],
            "is_correct": is_corr,
            "explanation": q["explanation"]
        })

    final_score = min(10.0, round(score_total, 2))

    # AI Diagnostic
    distinct_weak = list(set(weak_topics))
    if not distinct_weak:
        diagnostic = "Xuất sắc! Bạn nắm vững 100% kiến thức Vật Lý THCS và tự tin đạt điểm tối đa bài thi vào lớp 10."
    else:
        diagnostic = f"Chẩn đoán lỗ hổng kiến thức: Bạn cần củng cố thêm các phần: {', '.join(distinct_weak)}. Đề xuất: Mở phòng Thí Nghiệm Ảo và dùng Trợ Lý RAG AI để ôn lại lý thuyết trọng tâm!"

    return {
        "final_score": final_score,
        "max_score": max_score,
        "diagnostic": diagnostic,
        "weak_topics": distinct_weak,
        "part1_details": details_p1,
        "part2_details": details_p2,
        "part3_details": details_p3
    }
