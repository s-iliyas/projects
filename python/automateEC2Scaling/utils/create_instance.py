import boto3


def create_ec2_instances(data):
    instances_ids = []
    try:
        # Create a Boto3 EC2 client
        ec2 = boto3.client(
            "ec2",
            aws_access_key_id=data["aws_access_key_id"],
            aws_secret_access_key=data["aws_secret_access_key"],
            region_name=data["aws_region"],
        )
        # Launch a new instance using the created AMI
        response = ec2.run_instances(
            ImageId=data["aws_ec2_ami_id"],
            InstanceType=data["aws_ec2_instance_type"],
            KeyName=data["aws_key_pair_name"],
            SecurityGroupIds=data["aws_ec2_security_group_ids"],
            BlockDeviceMappings=[
                {
                    "DeviceName": "/dev/sda1",
                    "Ebs": data["aws_ec2_ebs"],
                },
            ],
            MinCount=data["aws_ec2_min_count"],
            MaxCount=data["aws_ec2_max_count"],
            UserData=data["aws_ec2_user_data"]
        )
        if len(response["Instances"]) > 0:
            for item in response["Instances"]:
                instances_ids.append(item["InstanceId"])
    except Exception as e:
        print(f"[EC2_CREATION_ERROR_OCCURED] - {e.args[0]}")
    return instances_ids
