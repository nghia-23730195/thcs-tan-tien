@echo off
cd /d "%~dp0"
if not exist "design\mockups" mkdir "design\mockups"
move "physix_trang_ch_c_ng_h_c_v_t_l_thpt" "design\mockups\home"
move "chi_ti_t_b_i_h_c_ph_ng_th_nghi_m_o_dao_ng_i_u_h_a" "design\mockups\lab-harmonic-oscillation"
move "ph_ng_th_nghi_m_o_k_t_n_i_thi_t_b_th_c_nghi_m_vernier_iot" "design\mockups\iot-vernier-lab"
move "ng_n_h_ng_thi_luy_n_thi_thpt_qu_c_gia" "design\mockups\quiz-exam-bank"
move "k_t_qu_h_ng_d_n_gi_i_chi_ti_t_b_i_thi_thpt_qu_c_gia" "design\mockups\quiz-result-solution"
move "b_ng_theo_d_i_ti_n_c_nh_n_nh_gi_n_ng_l_c" "design\mockups\progress-dashboard"
move "quantum_precision" "design\design-system"
echo.
echo Done.
pause
