import boto3
import json


def create_ec2_lb(data):
    try:
        elb_client = boto3.client(
            "elbv2",
            aws_access_key_id=data["aws_access_key_id"],
            aws_secret_access_key=data["aws_secret_access_key"],
            region_name=data["aws_region"],
        )
        with open("arns.json", "r") as f:
            arns = json.load(f)
        if not arns["aws_ec2_load_balancer_arn"]:
            # Create a load balancer
            elb_response = elb_client.create_load_balancer(
                Name="my-load-balancer",
                Subnets=data["aws_ec2_subnet_id"],  # Specify your subnet IDs
                SecurityGroups=data[
                    "aws_ec2_security_group_ids"
                ],  # Specify your security group IDs
            )
            # Get the load balancer ARN
            arns["aws_ec2_load_balancer_arn"] = elb_response["LoadBalancers"][0][
                "LoadBalancerArn"
            ]
            with open("arns.json", "w") as f:
                f.write(json.dumps(arns, indent=4))
        # Attach the existing Target Group to the Load Balancer
        elb_client.create_listener(
            DefaultActions=[
                {
                    "Type": "fixed-response",
                    "FixedResponseConfig": {
                        "ContentType": "text/plain",
                        "StatusCode": "200",
                        "MessageBody": "OK",
                    },
                },
            ],
            LoadBalancerArn=arns["aws_ec2_load_balancer_arn"],
            Port=80,
            Protocol="HTTP",
            # SslPolicy="ELBSecurityPolicy-2016-08",  # Specify your SSL policy if using HTTPS
        )
        return True
    except Exception as e:
        print(f"[LB_ERROR_OCCURED] - {e.args[0]}")
        return False
