import boto3
import json
import time


def create_ec2_tg(data):
    try:
        elb_client = boto3.client(
            "elbv2",
            aws_access_key_id=data["aws_access_key_id"],
            aws_secret_access_key=data["aws_secret_access_key"],
            region_name=data["aws_region"],
        )
        with open("arns.json", "r") as f:
            arns = json.load(f)
        # Create a target group
        if not arns["aws_ec2_target_group_arn"]:
            target_group_response = elb_client.create_target_group(
                Name="my-target-group",
                Protocol="HTTP",
                Port=80,
                VpcId=data["aws_ec2_vpc_id"],  # Specify your VPC ID
            )
            # Get the target group ARN
            arns["aws_ec2_target_group_arn"] = target_group_response["TargetGroups"][0][
                "TargetGroupArn"
            ]
            with open("arns.json", "w") as f:
                f.write(json.dumps(arns, indent=4))
        # Register the EC2 instance with the target group
        ec2 = boto3.client(
            "ec2",
            aws_access_key_id=data["aws_access_key_id"],
            aws_secret_access_key=data["aws_secret_access_key"],
            region_name=data["aws_region"],
        )
        sec = 0
        while True:
            response = ec2.describe_instances(
                InstanceIds=data["aws_ec2_instance_ids"]
            )
            check = []
            print()
            for item in response['Reservations'][0]["Instances"]:
                check.append(item["State"]["Name"])
            ec2_status = all(x == "running" for x in check)
            if ec2_status:
                break
            else:
                print(f"EC2 status checked in {sec} seconds!")
                time.sleep(15)
                sec += 15

        elb_client.register_targets(
            TargetGroupArn=arns["aws_ec2_target_group_arn"],
            Targets=[
                {
                    "Id": instance_id,
                    "Port": 80,
                }
                for instance_id in data["aws_ec2_instance_ids"]
            ],
        )
        return True
    except Exception as e:
        print(f"[TG_ERROR_OCCURED] - {e.args[0]}")
        return False
