# Vagrant Playground

My Vagrant Playground for testing/learning.

## 01 - Ubuntu 22.04

This project does nothing special than to setup an ubuntu VM with vagrant.

## 02 - Apache Custom Login

Host static website with apache in an Ubuntu VM. The websites use basic authentication with custom login form.

Content:

- Use vagrant to provision two Ubuntu VMs
- Use ansible to
- - install and configure apache server in the Vms
- - copy website files to the VMs
- - enable/disable apache modules and sites
- - reload apache server

## 03 - Caddy Server

Host static website with Caddy in an Ubuntu VM.

Content:

- Use vagrant to provision two Ubuntu VMs
- Use docker provisioning to
- - install and configure Caddy server in the Vms
- - copy website files to the VMs
- - deploy a docker stack with Caddy and two other docker images
- Caddy serves the static websites from the marketing folder
- Caddy serves the admin and client websites from the docker images
- Caddy manages on demand TLS certificates for custom domains
- Caddy manages local TLS certificates for websites including wildcard domains
