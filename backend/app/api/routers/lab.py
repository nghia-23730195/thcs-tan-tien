"""
Virtual Lab computation API for THCS (KHTN 8-9) experiments.
All quantities and symbols follow SI / ISO 80000 conventions.
"""
from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/lab", tags=["Physics Virtual Lab (SI / ISO 80000)"])

# Standard acceleration of gravity g_n (CGPM 1901, ISO 80000-3), m/s^2
STANDARD_GRAVITY = 9.80665


# ================= 1. ARCHIMEDES' PRINCIPLE (ISO 80000-4) =================
class BuoyancyParams(BaseModel):
    rho_fluid: float = Field(1000.0, gt=0, description="Khối lượng riêng chất lỏng ρ_fluid (kg/m³)")
    rho_obj: float = Field(2700.0, gt=0, description="Khối lượng riêng vật ρ_obj (kg/m³)")
    volume: float = Field(1.2e-4, gt=0, description="Thể tích vật V (m³)")
    submerged_fraction: float = Field(1.0, ge=0, le=1, description="Tỉ lệ thể tích ngập (0-1)")
    g: float = Field(STANDARD_GRAVITY, gt=0, description="Gia tốc trọng trường g (m/s²)")


@router.post("/buoyancy")
def compute_buoyancy(p: BuoyancyParams):
    v_disp = p.volume * p.submerged_fraction
    weight = p.rho_obj * p.g * p.volume            # W = m·g = ρ_obj·g·V
    f_b = p.rho_fluid * p.g * v_disp               # F_b = ρ_fluid·g·V_disp
    w_app = max(0.0, weight - f_b)                 # W_app = W − F_b
    if p.rho_obj > p.rho_fluid:
        state = "sink"
    elif p.rho_obj < p.rho_fluid:
        state = "float"
    else:
        state = "neutral"
    return {
        "W": round(weight, 4),
        "F_b": round(f_b, 4),
        "W_app": round(w_app, 4),
        "V_disp": v_disp,
        "m_disp": round(p.rho_fluid * v_disp, 6),
        "state": state,
        "units": {"W": "N", "F_b": "N", "W_app": "N", "V_disp": "m³", "m_disp": "kg"},
    }


# ================= 2. OHM'S LAW & POWER (IEC 60050 / ISO 80000-6) =================
class CircuitParams(BaseModel):
    U: float = Field(6.0, ge=0, description="Hiệu điện thế U (V)")
    R1: float = Field(20.0, gt=0, description="Điện trở R₁ (Ω)")
    R2: Optional[float] = Field(None, gt=0, description="Điện trở R₂ (Ω), tuỳ chọn")
    connection: str = Field("series", description="'series' hoặc 'parallel'")
    t: float = Field(60.0, ge=0, description="Thời gian t (s) để tính nhiệt lượng Q")


@router.post("/circuit")
def compute_circuit(p: CircuitParams):
    if p.R2 is None:
        r_eq = p.R1
    elif p.connection == "series":
        r_eq = p.R1 + p.R2                          # R_eq = R₁ + R₂
    elif p.connection == "parallel":
        r_eq = (p.R1 * p.R2) / (p.R1 + p.R2)        # 1/R_eq = 1/R₁ + 1/R₂
    else:
        raise HTTPException(status_code=400, detail="connection must be 'series' or 'parallel'")
    current = p.U / r_eq                            # I = U / R_eq
    power = p.U * current                           # P = U·I
    heat = current ** 2 * r_eq * p.t                # Q = I²·R·t
    return {
        "R_eq": round(r_eq, 4),
        "I": round(current, 4),
        "P": round(power, 4),
        "Q": round(heat, 4),
        "units": {"R_eq": "Ω", "I": "A", "P": "W", "Q": "J"},
    }


# ================= 3. THIN LENS EQUATION (Gaussian optics, ISO 10110) =================
class LensParams(BaseModel):
    f: float = Field(0.15, description="Tiêu cự f (m); f > 0 hội tụ, f < 0 phân kỳ")
    d_o: float = Field(0.30, gt=0, description="Khoảng cách vật d_o (m)")
    h_o: float = Field(0.025, gt=0, description="Chiều cao vật h_o (m)")


@router.post("/lens")
def compute_lens(p: LensParams):
    if p.f == 0:
        raise HTTPException(status_code=400, detail="f must be non-zero")
    if abs(p.d_o - p.f) < 1e-9:
        return {"d_i": None, "m": None, "h_i": None, "D": round(1 / p.f, 4),
                "image": "at_infinity", "units": {"D": "dp"}}
    d_i = (p.d_o * p.f) / (p.d_o - p.f)              # 1/f = 1/d_o + 1/d_i
    m = -d_i / p.d_o                                 # m = −d_i / d_o
    return {
        "d_i": round(d_i, 5),
        "m": round(m, 4),
        "h_i": round(m * p.h_o, 5),                  # h_i = m·h_o
        "D": round(1 / p.f, 4),                      # D = 1/f (diopter)
        "image": "real_inverted" if d_i > 0 else "virtual_upright",
        "units": {"d_i": "m", "h_i": "m", "D": "dp", "m": "1"},
    }


# ================= 4. PRINCIPLE OF MOMENTS (ISO 80000-4) =================
class LeverParams(BaseModel):
    F1: float = Field(2.0, ge=0, description="Lực F₁ (N)")
    d1: float = Field(0.15, gt=0, description="Cánh tay đòn d₁ (m)")
    F2: float = Field(3.0, ge=0, description="Lực F₂ (N)")
    d2: float = Field(0.10, gt=0, description="Cánh tay đòn d₂ (m)")


@router.post("/lever")
def compute_lever(p: LeverParams):
    m1 = p.F1 * p.d1                                 # M₁ = F₁·d₁
    m2 = p.F2 * p.d2                                 # M₂ = F₂·d₂
    net = m1 - m2                                    # ΣM (chiều dương: quay về phía F₁)
    return {
        "M1": round(m1, 4),
        "M2": round(m2, 4),
        "sum_M": round(net, 4),
        "balanced": abs(net) < 1e-6,
        "MA": round(p.d1 / p.d2, 4),                 # MA = d₁/d₂ = F_load/F_effort
        "units": {"M1": "N·m", "M2": "N·m", "sum_M": "N·m", "MA": "1"},
    }
