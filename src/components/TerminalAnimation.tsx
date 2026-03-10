import { useState, useEffect, useRef } from "react";

type LineType = "command" | "header" | "task" | "ok" | "changed" | "skipping" | "warning" | "recap" | "blank";

interface TermLine {
  text: string;
  type: LineType;
}

const terminalLines: TermLine[] = [
  { text: "➜  acme_dns ansible-playbook -i inventories/prod.ini playbook.yml --diff -vv", type: "command" },
  { text: "", type: "blank" },
  { text: "ansible-playbook [core 2.20.1]", type: "warning" },
  { text: "  config file = None", type: "warning" },
  { text: "  configured module search path = ['/Users/idustbin/.ansible/plugins/modules', '/usr/share/ansible/plugins/modules']", type: "warning" },
  { text: "  ansible python module location = /opt/homebrew/Cellar/ansible/13.2.0_3/libexec/lib/python3.14/site-packages/ansible", type: "warning" },
  { text: "  ansible collection location = /Users/idustbin/.ansible/collections:/usr/share/ansible/collections", type: "warning" },
  { text: "  executable location = /opt/homebrew/bin/ansible-playbook", type: "warning" },
  { text: "  python version = 3.14.2 (main, Dec  5 2025, 16:49:16) [Clang 17.0.0 (clang-1700.4.4.1)] (/opt/homebrew/Cellar/ansible/13.2.0_3/libexec/bin/python)", type: "warning" },
  { text: "  jinja version = 3.1.6", type: "warning" },
  { text: "  pyyaml version = 6.0.3 (with libyaml v0.2.5)", type: "warning" },
  { text: "No config file found; using defaults", type: "warning" },
  { text: "Skipping callback 'minimal', as we already have a stdout callback.", type: "skipping" },
  { text: "Skipping callback 'oneline', as we already have a stdout callback.", type: "skipping" },
  { text: "", type: "blank" },
  { text: "PLAYBOOK: playbook.yml ***************************************************************************************************************************************************", type: "header" },
  { text: "1 plays in playbook.yml", type: "task" },
  { text: "", type: "blank" },
  { text: "PLAY [Deploy public acme-dns] ********************************************************************************************************************************************", type: "header" },
  { text: "", type: "blank" },
  { text: "TASK [Gathering Facts] ***************************************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/playbook.yml:2", type: "task" },
  { text: "[WARNING]: Host 'jump' is using the discovered Python interpreter at '/usr/bin/python3.11', but future installation of another Python interpreter could cause a different interpreter to be discovered.", type: "warning" },
  { text: "ok: [jump]", type: "ok" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Resolve supported acme-dns architecture] ****************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:3", type: "task" },
  { text: 'ok: [jump] => {"ansible_facts": {"acme_dns_resolved_arch": "arm64"}, "changed": false}', type: "ok" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Abort on unsupported architecture] **********************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:7", type: "task" },
  { text: 'skipping: [jump] => {"changed": false, "false_condition": "acme_dns_resolved_arch == \'unsupported\'", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Normalize requested installation method] ****************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:14", type: "task" },
  { text: 'ok: [jump] => {"ansible_facts": {"acme_dns_install_method_normalized": "source"}, "changed": false}', type: "ok" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Resolve effective installation method] ******************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:18", type: "task" },
  { text: 'ok: [jump] => {"ansible_facts": {"acme_dns_effective_install_method": "source"}, "changed": false}', type: "ok" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Abort on unsupported installation method] ***************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:27", type: "task" },
  { text: 'skipping: [jump] => {"changed": false, "false_condition": "acme_dns_effective_install_method not in [\'binary\', \'source\']", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Build acme-dns binary URL for target architecture] ******************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:34", type: "task" },
  { text: 'skipping: [jump] => {"changed": false, "false_condition": "acme_dns_effective_install_method == \'binary\'", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Update apt cache] ***************************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:39", type: "task" },
  { text: 'ok: [jump] => {"cache_update_time": 1773127645, "cache_updated": false, "changed": false}', type: "ok" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Ensure base packages are installed for binary deployment with ufw] **************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:45", type: "task" },
  { text: 'skipping: [jump] => {"changed": false, "false_condition": "acme_dns_effective_install_method == \'binary\'", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Ensure base packages are installed for binary deployment without ufw] ***********************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:56", type: "task" },
  { text: 'skipping: [jump] => {"changed": false, "false_condition": "acme_dns_effective_install_method == \'binary\'", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Ensure build packages are installed for source deployment with ufw] *************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:66", type: "task" },
  { text: 'ok: [jump] => {"cache_update_time": 1773127645, "cache_updated": false, "changed": false}', type: "ok" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Ensure build packages are installed for source deployment without ufw] **********************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:83", type: "task" },
  { text: 'skipping: [jump] => {"changed": false, "false_condition": "acme_dns_firewall_type != \'ufw\'", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Ensure group exists] ************************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:99", type: "task" },
  { text: 'ok: [jump] => {"changed": false, "gid": 992, "name": "acme-dns", "state": "present", "system": true}', type: "ok" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Ensure user exists] *************************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:105", type: "task" },
  { text: 'ok: [jump] => {"append": false, "changed": false, "comment": "", "group": 992, "home": "/var/lib/acme-dns", "move_home": false, "name": "acme-dns", "shell": "/usr/sbin/nologin", "state": "present", "uid": 995}', type: "ok" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Ensure config directory exists] *************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:115", type: "task" },
  { text: 'ok: [jump] => {"changed": false, "gid": 0, "group": "root", "mode": "0755", "owner": "root", "path": "/etc/acme-dns", "size": 4096, "state": "directory", "uid": 0}', type: "ok" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Ensure data directory exists] ***************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:123", type: "task" },
  { text: 'ok: [jump] => {"changed": false, "gid": 992, "group": "acme-dns", "mode": "0755", "owner": "acme-dns", "path": "/var/lib/acme-dns", "size": 4096, "state": "directory", "uid": 995}', type: "ok" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Download acme-dns binary] *******************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:131", type: "task" },
  { text: 'skipping: [jump] => {"changed": false, "false_condition": "acme_dns_effective_install_method == \'binary\'", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Create temporary build directory] ***********************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:142", type: "task" },
  { text: 'changed: [jump] => {"changed": true, "gid": 0, "group": "root", "mode": "0700", "owner": "root", "path": "/tmp/ansible.3guetji2acme_dns_build", "size": 4096, "state": "directory", "uid": 0}', type: "changed" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Checkout acme-dns source] *******************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:149", type: "task" },
  { text: ">> Newly checked out 4e5a69e5fb742dde4f755b7f56aee2aea76e19bf", type: "warning" },
  { text: 'changed: [jump] => {"after": "4e5a69e5fb742dde4f755b7f56aee2aea76e19bf", "before": null, "changed": true}', type: "changed" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Download Go 1.23.5 for arm64 from dl.google.com] ********************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:157", type: "task" },
  { text: 'changed: [jump] => {"changed": true, "path": "/usr/local/go", "state": "absent"}', type: "changed" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Extract Go 1.23.5 for arm64] ****************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:183", type: "task" },
  { text: 'changed: [jump] => {"changed": true, "dest": "/usr/local", "gid": 0, "group": "root", "handler": "TgzArchive", "mode": "0755", "owner": "root", "size": 4096, "src": "/tmp/go1.23.5.linux-arm64.tar.gz", "state": "directory", "uid": 0}', type: "changed" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Extract Go 1.23.5 for amd64] ****************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:192", type: "task" },
  { text: 'skipping: [jump] => {"changed": false, "false_condition": "acme_dns_resolved_arch == \'amd64\'", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Check Go binary after extract] **************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:201", type: "task" },
  { text: 'ok: [jump] => {"changed": false, "stat": {"executable": true, "exists": true, "mode": "0755", "path": "/usr/local/go/bin/go", "size": 12890630}}', type: "ok" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Abort if Go toolchain is missing after extract] *********************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:207", type: "task" },
  { text: 'skipping: [jump] => {"changed": false, "false_condition": "not acme_dns_go_binary_stat.stat.exists", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Build acme-dns from source with Go 1.23.5] **************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:214", type: "task" },
  { text: 'changed: [jump] => {"changed": true, "cmd": ["/usr/local/go/bin/go", "build", "-o", "/tmp/ansible.3guetji2acme_dns_build/acme-dns", "."], "delta": "0:00:02.801134", "rc": 0}', type: "changed" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Install built acme-dns binary] **************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:223", type: "task" },
  { text: "Notification for handler restart acme-dns has been saved.", type: "warning" },
  { text: 'changed: [jump] => {"changed": true, "checksum": "fa3d0613ba6a226692a965f251a31f9bb882898f", "dest": "/usr/local/bin/acme-dns", "mode": "0755", "size": 18311461, "state": "file"}', type: "changed" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Clean temporary build directory] ************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:234", type: "task" },
  { text: "--- before", type: "warning" },
  { text: "+++ after", type: "changed" },
  { text: '@@ -1,119 +1,4 @@', type: "warning" },
  { text: ' {', type: "task" },
  { text: '     "path": "/tmp/ansible.3guetji2acme_dns_build",', type: "task" },
  { text: '-    "path_content": {', type: "warning" },
  { text: '-        "directories": [', type: "warning" },
  { text: '-            "/tmp/ansible.3guetji2acme_dns_build/src",', type: "warning" },
  { text: '-            "/tmp/ansible.3guetji2acme_dns_build/src/.git",', type: "warning" },
  { text: '-            "/tmp/ansible.3guetji2acme_dns_build/src/pkg",', type: "warning" },
  { text: '-            "/tmp/ansible.3guetji2acme_dns_build/src/pkg/acmedns",', type: "warning" },
  { text: '-            "/tmp/ansible.3guetji2acme_dns_build/src/pkg/api",', type: "warning" },
  { text: '-            "/tmp/ansible.3guetji2acme_dns_build/src/pkg/database",', type: "warning" },
  { text: '-            "/tmp/ansible.3guetji2acme_dns_build/src/pkg/nameserver",', type: "warning" },
  { text: '-        ],', type: "warning" },
  { text: '-        "files": [', type: "warning" },
  { text: '-            "/tmp/ansible.3guetji2acme_dns_build/acme-dns",', type: "warning" },
  { text: '-            "/tmp/ansible.3guetji2acme_dns_build/src/main.go",', type: "warning" },
  { text: '-            "/tmp/ansible.3guetji2acme_dns_build/src/go.mod",', type: "warning" },
  { text: '-            "/tmp/ansible.3guetji2acme_dns_build/src/go.sum",', type: "warning" },
  { text: '-            "/tmp/ansible.3guetji2acme_dns_build/src/README.md",', type: "warning" },
  { text: '-        ]', type: "warning" },
  { text: '-    },', type: "warning" },
  { text: '-    "state": "directory"', type: "warning" },
  { text: '+    "state": "absent"', type: "changed" },
  { text: ' }', type: "task" },
  { text: 'changed: [jump] => {"changed": true, "path": "/tmp/ansible.3guetji2acme_dns_build", "state": "absent"}', type: "changed" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Check installed acme-dns binary] ************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:243", type: "task" },
  { text: 'ok: [jump] => {"changed": false, "stat": {"executable": true, "exists": true, "mode": "0755", "path": "/usr/local/bin/acme-dns", "size": 18311461}}', type: "ok" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Abort if acme-dns binary is missing] ********************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:248", type: "task" },
  { text: 'skipping: [jump] => {"changed": false, "false_condition": "not acme_dns_binary_stat.stat.exists", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Verify installed acme-dns binary] ***********************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:253", type: "task" },
  { text: 'ok: [jump] => {"changed": false, "cmd": ["/usr/local/bin/acme-dns", "--help"], "delta": "0:00:00.013900", "rc": 0, "stderr": "Usage of /usr/local/bin/acme-dns:\\n  -c string\\n    \\tconfig file location (default \\"/etc/acme-dns/config.cfg\\")"}', type: "ok" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Deploy acme-dns config] *********************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:259", type: "task" },
  { text: 'ok: [jump] => {"changed": false, "checksum": "3fbf7c391ddb382bf670f1e6269787bfd3412896", "dest": "/etc/acme-dns/config.cfg", "mode": "0644", "state": "file"}', type: "ok" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Deploy systemd service] *********************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:268", type: "task" },
  { text: 'ok: [jump] => {"changed": false, "checksum": "e997be59d0498965a9504ebc118b89d02e2df374", "dest": "/etc/systemd/system/acme-dns.service", "mode": "0644", "state": "file"}', type: "ok" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Flush handlers] *****************************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:277", type: "task" },
  { text: "NOTIFIED HANDLER acme_dns : restart acme-dns for jump", type: "warning" },
  { text: "META: triggered running handlers for jump", type: "warning" },
  { text: "", type: "blank" },
  { text: "RUNNING HANDLER [acme_dns : restart acme-dns] ****************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/handlers/main.yml:2", type: "task" },
  { text: 'changed: [jump] => {"changed": true, "name": "acme-dns", "state": "started", "status": {"ActiveState": "active", "SubState": "running", "MainPID": "89366", "NRestarts": "505"}}', type: "changed" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Ensure service is enabled and started] ******************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:280", type: "task" },
  { text: 'ok: [jump] => {"changed": false, "enabled": true, "name": "acme-dns", "state": "started"}', type: "ok" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Open firewall ports with ufw] ***************************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:287", type: "task" },
  { text: 'skipping: [jump] => (item=22/tcp)  => {"changed": false, "item": "22/tcp", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: 'skipping: [jump] => (item=53/tcp)  => {"changed": false, "item": "53/tcp", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: 'skipping: [jump] => (item=53/udp)  => {"changed": false, "item": "53/udp", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: 'skipping: [jump] => (item=443/tcp)  => {"changed": false, "item": "443/tcp", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: 'skipping: [jump] => {"changed": false, "msg": "All items skipped"}', type: "skipping" },
  { text: "", type: "blank" },
  { text: "TASK [acme_dns : Open firewall ports with firewalld] *********************************************************************************************************************", type: "header" },
  { text: "task path: /Users/idustbin/Desktop/acme_dns/roles/acme_dns/tasks/main.yml:297", type: "task" },
  { text: 'skipping: [jump] => (item=22/tcp)  => {"changed": false, "item": "22/tcp", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: 'skipping: [jump] => (item=53/tcp)  => {"changed": false, "item": "53/tcp", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: 'skipping: [jump] => (item=53/udp)  => {"changed": false, "item": "53/udp", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: 'skipping: [jump] => (item=443/tcp)  => {"changed": false, "item": "443/tcp", "skip_reason": "Conditional result was False"}', type: "skipping" },
  { text: 'skipping: [jump] => {"changed": false, "msg": "All items skipped"}', type: "skipping" },
  { text: "", type: "blank" },
  { text: "PLAY RECAP ***************************************************************************************************************************************************************", type: "header" },
  { text: "jump                       : ok=25   changed=8    unreachable=0    failed=0    skipped=13   rescued=0    ignored=0", type: "recap" },
];

const colorMap: Record<LineType, string> = {
  command: "text-[hsl(180,80%,70%)]",
  header: "text-foreground font-bold",
  task: "text-[hsl(180,30%,60%)]",
  ok: "text-[hsl(120,70%,55%)]",
  changed: "text-[hsl(45,100%,55%)]",
  skipping: "text-[hsl(180,80%,55%)]",
  warning: "text-[hsl(45,80%,55%)]",
  recap: "text-foreground font-bold",
  blank: "",
};

const RecapLine = ({ text }: { text: string }) => {
  // Parse: "jump  : ok=25   changed=8    unreachable=0    failed=0    skipped=13   rescued=0    ignored=0"
  const parts = text.split(/\s+/);
  const colorForKey = (key: string) => {
    if (key.startsWith("ok=")) return "text-[hsl(120,70%,55%)]";
    if (key.startsWith("changed=")) return "text-[hsl(45,100%,55%)]";
    if (key.startsWith("failed=")) return key === "failed=0" ? "text-[hsl(120,70%,55%)]" : "text-[hsl(0,80%,55%)]";
    if (key.startsWith("skipped=")) return "text-[hsl(180,80%,55%)]";
    if (key.startsWith("unreachable=")) return "text-foreground";
    if (key.startsWith("rescued=")) return "text-foreground";
    if (key.startsWith("ignored=")) return "text-foreground";
    return "text-foreground";
  };
  return (
    <div className="font-bold whitespace-pre-wrap break-all">
      {parts.map((part, i) => (
        <span key={i} className={colorForKey(part)}>
          {part}{i < parts.length - 1 ? "   " : ""}
        </span>
      ))}
    </div>
  );
};

const TerminalAnimation = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [typingChar, setTypingChar] = useState(0);
  const commandText = terminalLines[0].text;

  useEffect(() => {
    // Phase 1: type the command
    if (typingChar < commandText.length) {
      const timeout = setTimeout(() => setTypingChar((c) => c + 1), 25 + Math.random() * 25);
      return () => clearTimeout(timeout);
    }

    // Phase 2: reveal lines
    if (visibleCount < terminalLines.length) {
      const line = terminalLines[visibleCount];
      const delay = line.type === "blank" ? 40 : line.type === "header" ? 120 : 80;
      const timeout = setTimeout(() => setVisibleCount((c) => c + 1), delay);
      return () => clearTimeout(timeout);
    }

    // Phase 3: pause then restart
    const timeout = setTimeout(() => {
      setVisibleCount(0);
      setTypingChar(0);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [typingChar, visibleCount, commandText.length]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleCount, typingChar]);

  return (
    <div className="w-full">
      <div className="rounded-lg overflow-hidden border border-[hsl(200,10%,25%)] glow-green">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[hsl(200,10%,15%)] border-b border-[hsl(200,10%,25%)]">
          <div className="w-3 h-3 rounded-full bg-[hsl(0,70%,50%)]" />
          <div className="w-3 h-3 rounded-full bg-[hsl(45,70%,50%)]" />
          <div className="w-3 h-3 rounded-full bg-[hsl(120,60%,40%)]" />
          <span className="ml-2 text-xs font-mono text-[hsl(180,20%,60%)]">idustbin@local.horst.lan:(zsh)</span>
        </div>
        {/* Terminal body */}
        <div
          ref={terminalRef}
          className="bg-[hsl(200,15%,10%)] p-4 h-48 overflow-y-auto font-mono text-[11px] leading-relaxed text-[hsl(180,20%,85%)] text-left"
        >
          {/* Typing phase */}
          {typingChar < commandText.length && (
            <div>
              <span className="text-[hsl(120,70%,55%)]">➜  </span>
              <span className="text-[hsl(180,80%,55%)]">acme_dns </span>
              {commandText.slice("➜  acme_dns ".length, typingChar)}
              <span className="animate-blink text-[hsl(180,80%,55%)]">▋</span>
            </div>
          )}

          {/* Revealed lines */}
          {visibleCount > 0 &&
            terminalLines.slice(0, visibleCount).map((line, i) => (
              <div key={i} className={`${colorMap[line.type]} whitespace-pre-wrap break-all`}>
                {line.type === "command" ? (
                  <>
                    <span className="text-[hsl(120,70%,55%)]">➜  </span>
                    <span className="text-[hsl(180,80%,55%)]">acme_dns </span>
                    {line.text.slice("➜  acme_dns ".length)}
                  </>
                ) : line.type === "recap" ? (
                  <RecapLine text={line.text} />
                ) : line.type === "blank" ? (
                  "\u00A0"
                ) : (
                  line.text
                )}
              </div>
            ))}

          {/* Blinking cursor at end */}
          {visibleCount >= terminalLines.length && (
            <div className="mt-1">
              <span className="text-[hsl(120,70%,55%)]">➜  </span>
              <span className="text-[hsl(180,80%,55%)]">acme_dns </span>
              <span className="animate-blink text-[hsl(180,80%,55%)]">▋</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalAnimation;
