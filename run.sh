ansible-playbook -i grafana_loki_hosts ubuntu_setup.yml

ansible-playbook -i grafana_loki_hosts ./func/loki_setup.yml
ansible-playbook -i grafana_loki_hosts ./func/grafana_setup.yml

ansible-playbook -i promtail_hosts promtail_setup.yml



