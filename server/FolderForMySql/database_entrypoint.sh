#!/bin/bash

echo Hello

netcat -l 8080
#test=1
#while [ $test -eq 1 ]
#do
#    echo -n > /dev/tcp/192.168.100.3/8080
#    test=$?
#    echo test result: $test
#done
#
#exec 3>/dev/tcp/192.168.100.2/8080;echo -e "Hello from client" >&3