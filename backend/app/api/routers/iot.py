from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
import json
import math
import random
import time

router = APIRouter(prefix="/iot", tags=["Vernier IoT Telemetry"])

@router.websocket("/ws/vernier")
async def websocket_vernier_stream(websocket: WebSocket):
    await websocket.accept()
    start_time = time.time()
    try:
        while True:
            # Check for incoming client commands (e.g. tare, set frequency)
            try:
                data = await asyncio.wait_for(websocket.receive_text(), timeout=0.05)
                # client sent command
                pass
            except asyncio.TimeoutError:
                pass

            t = time.time() - start_time
            # Generate realistic sensor telemetry (Motion Detector & Force Sensor)
            # Oscillation with subtle sensor noise
            position = 15.0 + 5.0 * math.cos(3.5 * t) + random.uniform(-0.05, 0.05) # cm
            force = 2.0 * math.cos(3.5 * t + math.pi) + random.uniform(-0.02, 0.02) # N
            velocity = -5.0 * 3.5 * math.sin(3.5 * t) + random.uniform(-0.1, 0.1) # cm/s

            packet = {
                "timestamp": round(t, 2),
                "device": "Vernier Go Direct® Sensor Hub",
                "status": "connected",
                "sample_rate_hz": 20,
                "sensors": {
                    "position_cm": round(position, 2),
                    "force_n": round(force, 3),
                    "velocity_cms": round(velocity, 2)
                }
            }
            await websocket.send_text(json.dumps(packet))
            await asyncio.sleep(0.05) # 20 Hz
    except WebSocketDisconnect:
        print("[IoT] Vernier sensor client disconnected")
    except Exception as e:
        print(f"[IoT] Stream error: {e}")
