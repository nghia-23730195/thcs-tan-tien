# Rename design mockup folders to a clean, conventional structure.
# Run from the project root:  .\rename_folders.ps1
$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

$map = [ordered]@{
  "physix_trang_ch_c_ng_h_c_v_t_l_thpt"                         = "design\mockups\home"
  "chi_ti_t_b_i_h_c_ph_ng_th_nghi_m_o_dao_ng_i_u_h_a"           = "design\mockups\lab-harmonic-oscillation"
  "ph_ng_th_nghi_m_o_k_t_n_i_thi_t_b_th_c_nghi_m_vernier_iot"   = "design\mockups\iot-vernier-lab"
  "ng_n_h_ng_thi_luy_n_thi_thpt_qu_c_gia"                       = "design\mockups\quiz-exam-bank"
  "k_t_qu_h_ng_d_n_gi_i_chi_ti_t_b_i_thi_thpt_qu_c_gia"         = "design\mockups\quiz-result-solution"
  "b_ng_theo_d_i_ti_n_c_nh_n_nh_gi_n_ng_l_c"                    = "design\mockups\progress-dashboard"
  "quantum_precision"                                           = "design\design-system"
}

New-Item -ItemType Directory -Force -Path "design\mockups" | Out-Null

foreach ($old in $map.Keys) {
  $new = $map[$old]
  if (-not (Test-Path $old)) { Write-Host "Skip (not found): $old" -ForegroundColor DarkGray; continue }
  if (Test-Path $new)        { Write-Host "Skip (target exists): $new" -ForegroundColor Yellow; continue }
  Move-Item -Path $old -Destination $new
  Write-Host "OK  $old  ->  $new" -ForegroundColor Green
}
Write-Host "Done." -ForegroundColor Cyan
