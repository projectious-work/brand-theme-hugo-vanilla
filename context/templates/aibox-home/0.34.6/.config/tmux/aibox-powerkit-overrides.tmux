# Powerkit renders these list-specific sections; tmux only supplies alignment.
set -g status 2
set -g 'status-format[0]' '#[align=left range=left #{E:status-left-style}]#[push-default]#(~/.local/bin/aibox-powerkit-render-session)#[pop-default]#[norange default]#[push-default]#{W:#[range=window|#{window_index} #{E:window-status-style}]#{T:window-status-format}#[norange default],#[range=window|#{window_index} #{E:window-status-current-style}]#{T:window-status-current-format}#[norange default]}#[pop-default]#{E:@_powerkit_left_edge_sep}#[nolist align=right range=right #{E:status-right-style}]#[push-default]#(~/.local/bin/aibox-powerkit-render-list right aibox_log,aibox_oom,aibox_proc,aibox_ai,aibox_mcp,aibox_mig,weather,uptime,datetime)#[pop-default]#[norange default]'
set -g 'status-format[1]' '#[align=left]#(~/.local/bin/aibox-powerkit-render-list left forge,kubernetes,terraform,cloud)#[align=right]#(~/.local/bin/aibox-powerkit-render-list right hostname,externalip,ssh,netspeed,ping,cpu,loadavg,memory,swap,disk,gpu)'

# aibox post-PowerKit overrides.
# PowerKit's renderer owns status-format and pane styles when it loads. Keep
# the aibox two-row status shape and pane surfaces authoritative after that
# render pass.
set -g window-style "bg=#2D2C37,fg=#CAC4B6"
set -g window-active-style "bg=#1F1F28,fg=#DCD7BA"
set -g pane-border-style "fg=#938AA9,bg=#1F1F28"
set -g pane-active-border-style "fg=#7E9CD8,bg=#1F1F28"
set -g pane-border-indicators both
set -g pane-border-format "#[bg=#1F1F28]#{?pane_active,#[fg=#7E9CD8]#[bold],#[fg=#CAC4B6]#[dim] } #{?client_prefix,PREFIX,NORMAL} #{pane_title} #{pane_current_command} #[bg=#1F1F28,fg=#1F1F28] "
