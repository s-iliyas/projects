import paramiko
from pathlib import Path


def ssh_commands():
    # EC2 instance details

    ec2_public_ip = '35.91.202.47'
    ec2_username = 'ubuntu'  # Default username for Ubuntu instances

    # SSH key for authentication
    private_key_path = Path.cwd()

    # Command to run (in this case, cloning a Git repository)
    git_repo_url = 'https://github.com/s-iliyas/moviesBackend-Iliyas.git'
    command = f'git clone {git_repo_url}'

    # Create an SSH client
    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    # Connect to the EC2 instance using the private key
    private_key = paramiko.RSAKey.from_private_key_file(private_key_path/'test.pem')
    ssh_client.connect(ec2_public_ip, username=ec2_username, pkey=private_key)

    # Execute the command
    stdin, stdout, stderr = ssh_client.exec_command(command)
    exit_status = stdout.channel.recv_exit_status()

    # Print command output
    print("Command output:")
    print(stdout.read().decode('utf-8'))

    # Close the SSH connection
    ssh_client.close()
    return {
        'statusCode': 200,
        'message': 'Commands executed'
    }


ssh_commands()
