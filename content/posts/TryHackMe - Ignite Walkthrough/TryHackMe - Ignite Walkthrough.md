---
title: TryHackMe - Ignite Walkthrough
description: TryHackMe's Ignite room is a beginner-friendly challenge involving a vulnerable CMS and leveraging a reverse shell to gain root access. This write-up will guide you through every step, from the initial Nmap scan to achieving root privileges.
image: images/TryHackMe - Ignite Walkthrough/Banner.jpg
tags:
  - blog
  - CTF
  - TryHackMe
  - Web_Pentesting
date: 2024-12-03
---
[TryHackMe](https://tryhackme.com/)’s Ignite room is a beginner-friendly challenge involving a vulnerable CMS and leveraging a reverse shell to gain root access. This write-up will guide you through every step, from the initial Nmap scan to achieving root privileges.

### Task 1: Root it!

1. User.txt

Start the target machine by clicking the green “Start Machine” button at the top of the task. To connect to the TryHackMe network, I’ll use my personal Kali virtual machine and establish a connection via OpenVPN.

![Alt image](images/lets_start.jpg)

Starting the target machine

Now that we have everything set up, we can start breaking into the machine. Let’s start with a basic nmap scan. We want to list the services and we want it to be very verbose so we’ll use the sV flag.

The full command will look like the following:

```bash
nmap -sV <Machine-IP>
```

![](https://cdn-images-1.medium.com/max/640/1*F1BfO03xszb0hL2FXqpEjA.png)

Results of the nmap scan

Let’s navigate to this website and see what’s on there.

![](https://cdn-images-1.medium.com/max/640/1*vU19IiqLDvZd-w5hWeRISA.png)

Navigating to the website

So, let’s search about vulnerabilities to exploit it.

![](https://cdn-images-1.medium.com/max/640/1*xWcNNOsndlpzOGmEjDf8sQ.png)

![](https://cdn-images-1.medium.com/max/640/1*u53diavBbKraApsjiw5vyA.png)

Results of the Search

Copy the code of exploitation and paste it on <_filename>.py_

And run the code like:

```bash
python3 exploitFuel.py -u http://<Machine-IP>/
```

And Booooooom! Hacking successfully completed.

![](https://cdn-images-1.medium.com/max/640/1*6t0Pg0BmdWJE_xY6D3fz-g.png)

Hacking successfully completed!

Now Let’s make this session more stable. We can make this session as reverse shell using netcat. At the first, we will make the netcat on our local machine listen to connection of session.

The full command will look like the following:

```bash
nc -lnvp <Listening-Port>
```

And then, we will search about netcat reverse shell to make the machine connect on our local machine. Like:

![](https://cdn-images-1.medium.com/max/640/1*rPxz_EZM4Q4uvHsX6pqn7w.png)

Change the IP and Port number with your IP and Port number. Copy the command and paste it on the our session with the machine

![](https://cdn-images-1.medium.com/max/640/1*HV9K01CK_zmL_cSoQeBxcw.png)

Now we find the connection completed the the netcat.

![](https://cdn-images-1.medium.com/max/640/1*ef18WzuYi7O9_Znpn-g9SQ.png)

And Now, Let’s Search about the User.txt Flag

![](https://cdn-images-1.medium.com/max/640/1*eB8BlqZr-pvMhz77faKrqg.png)

2. Root.txt

And Now, Let’s escalate our privileges. After extensive searching through the website’s directories, I discovered that the application has a database, and I found the username and password for the root user.

![](https://cdn-images-1.medium.com/max/640/1*LuISJw28SWoFcWaVai585w.png)

![](https://cdn-images-1.medium.com/max/640/1*21rIHGEGO8aM_ypw9tRvdQ.png)

So, I switched to the root user, navigated to the root directory, and found the root flag.

![](https://cdn-images-1.medium.com/max/640/1*tobDTU4RPrt_rVaNEEPzbw.png)

We’ve successfully completed the room! Starting with an **nmap** scan, we worked our way to root access by exploiting a vulnerable CMS, obtaining a reverse shell, and performing shell upgrades. I hope this writeup proves helpful in guiding you through the room!

Happy Hacking 👨‍💻