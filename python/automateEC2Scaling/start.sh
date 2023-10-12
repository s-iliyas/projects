#!/bin/bash

# make sure this file is executable(chmod +x start.sh)
# * * * * * /home/ubuntu/projects/python/automateEC2Scaling/start.sh
# Define paths and filenames
PYTHON_SCRIPT_PATH="/home/ubuntu/projects/python/automateEC2Scaling/dump.py"
REQUIREMENTS_FILE="/home/ubuntu/projects/python/automateEC2Scaling/requirements.txt"
LOG_FILE="/home/ubuntu/python/automateEC2Scaling/logfile.log"

# Check CPU usage
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d. -f1)

# ./monitor_cpu.sh &
while true; do
    # If CPU usage is 90% or above, install Python dependencies and run the script
    if [ "$CPU_USAGE" -ge 90 ]; then
        echo "CPU usage is $CPU_USAGE%. Installing Python dependencies and running the script." >> "$LOG_FILE"
        # Install Python dependencies
        pip install -r "$REQUIREMENTS_FILE" >> "$LOG_FILE" 2>&1
        # Run the Python script
        python3 "$PYTHON_SCRIPT_PATH" >> "$LOG_FILE" 2>&1
        echo "Script execution completed." >> "$LOG_FILE"
    else
        echo "CPU usage is below 90%. No action taken." >> "$LOG_FILE"
    fi
    # Sleep for a while before checking again (adjust as needed)
    sleep 1  # Sleep for 1 second (adjust as needed)
done

