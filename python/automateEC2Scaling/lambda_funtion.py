import os
import time
import boto3

from dotenv import load_dotenv

from utils.create_instance import create_ec2_instances
from utils.create_ami import create_ec2_ami
from utils.create_target_group import create_ec2_tg
from utils.create_load_balancer import create_ec2_lb


load_dotenv()


def lambda_handler(event, context):
    data = {
        "aws_region": os.getenv("AWS_REGION"),
        "aws_access_key_id": os.getenv("AWS_ACCESS_KEY_ID"),
        "aws_secret_access_key": os.getenv("AWS_ACCESS_SECRET_KEY"),
        "aws_ec2_instance_type": os.getenv("AWS_EC2_INSTANCE_TYPE"),
        "aws_key_pair_name": os.getenv("AWS_KEY_PAIR_NAME"),
        "aws_ec2_security_group_ids": [os.getenv("AWS_EC2_SECURITY_GROUP_ID")],
        "aws_ec2_ebs": {
            "VolumeSize": int(os.getenv("AWS_EC2_VOLUME_SIZE")),
            "VolumeType": os.getenv("AWS_EC2_VOLUME_TYPE"),
        },
        "aws_ec2_min_count": 1,
        "aws_ec2_max_count": 1,
        "aws_ec2_source_id": os.getenv("AWS_EC2_SOURCE_ID"),
        "aws_ec2_vpc_id": os.getenv("AWS_EC2_VPC_ID"),
        "aws_ec2_subnet_id": [
            os.getenv("AWS_EC2_SUBNET_ID"),
            os.getenv("AWS_EC2_SUBNET_ID_1"),
        ],
    }
    try:
        # Create a Boto3 EC2 client
        ec2 = boto3.client(
            "ec2",
            aws_access_key_id=data["aws_access_key_id"],
            aws_secret_access_key=data["aws_secret_access_key"],
            region_name=data["aws_region"],
        )
        ami_id = create_ec2_ami(data)
        # Wait for the image to be available
        sec = 0
        while True:
            response = ec2.describe_images(ImageIds=[ami_id])
            image_state = response["Images"][0]["State"]
            if image_state == "available":
                print(f"Image {ami_id} is now available in {sec} seconds!")
                break
            elif image_state == "failed":
                print(f"Image {ami_id} creation failed.")
                break
            else:
                print(
                    f"Image {ami_id} is still in {image_state} state. Waited for {sec} seconds..."
                )
                time.sleep(15)  # Wait for 10 seconds before checking again
                sec += 15
        data["aws_ec2_ami_id"] = ami_id
        # create instances
        instances_ids = create_ec2_instances(data)
        data["aws_ec2_instance_ids"] = instances_ids
        if len(instances_ids) > 0:
            tg_bool = create_ec2_tg(data)
            if tg_bool:
                lb_bool = create_ec2_lb(data)
                if lb_bool:
                    return {
                        "statusCode": 200,
                        "message": "EC2s are created and are in load balancing.",
                    }
                return {
                    "statusCode": 400,
                    "message": "EC2s are not attached to Load balancer.",
                }
            else:
                return {
                    "statusCode": 400,
                    "message": "EC2s are not attached to target group.",
                }
        else:
            return {"statusCode": 400, "message": "No Instances created"}
    except Exception as e:
        print(f"[ERROR_OCCURED] - {e.args[0]}")
        return {"statusCode": 400, "error": e.args[0]}


lambda_handler("", "")
