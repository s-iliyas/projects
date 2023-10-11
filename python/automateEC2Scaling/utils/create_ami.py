import boto3


def create_ec2_ami(data):
    ec2 = boto3.client(
        "ec2",
        aws_access_key_id=data["aws_access_key_id"],
        aws_secret_access_key=data["aws_secret_access_key"],
        region_name=data["aws_region"],
    )

    # Create an AMI from the source instance
    response = ec2.create_image(
        InstanceId=data["aws_ec2_source_id"],
        Name=f"ReplicaAMI",
        Description=f"An AMI named created for replica",
    )
    ami_id = response["ImageId"]
    return ami_id
