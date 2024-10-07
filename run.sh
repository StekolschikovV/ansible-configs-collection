ansible-playbook -i hosts ubuntu_setup.yml

ansible-playbook -i hosts ./func/loki_setup.yml
ansible-playbook -i hosts ./func/grafana_setup.yml
