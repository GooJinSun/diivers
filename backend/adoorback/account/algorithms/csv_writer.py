import csv
import os
import pandas as pd


USER_INFO_FIELDS = ['id', 'email', 'gender', 'date_of_birth', 'ethnicity']

def create_dormant_csv(users):
    dir_name = os.path.dirname(os.path.abspath(__file__))
    csvfile = open(os.path.join(dir_name, 'dormant_users.csv'), 'a')
    writer = csv.writer(csvfile)

    for user in users:
        row = ""
        for field in USER_INFO_FIELDS:
            row += str(getattr(user, field)) + ","
        writer.writerow([c.strip() for c in row.strip(',').split(',')])

    csvfile.close()


def delete_dormant_users_from_csv(users):
    dir_name = os.path.dirname(os.path.abspath(__file__))
    user_ids = list(users.values_list('id', flat=True))

    with open(os.path.join(dir_name, 'dormant_users.csv'), 'r') as csvfile:
        lines = csvfile.readlines()

    csvfile = open(os.path.join(dir_name, 'dormant_users.csv'), 'w')
    field_info = dict()
    for line in lines:
        user_id = int(line.split(",")[0])
        if user_id not in user_ids:
            csvfile.write(line)
        else:
            field_info[user_id] = line.strip().split(",")

    csvfile.close()

    return field_info


def get_dormant_user_df():
    dir_name = os.path.dirname(os.path.abspath(__file__))
    dormant_users = pd.read_csv(os.path.join(dir_name, 'dormant_users.csv'),
                                names=USER_INFO_FIELDS)
    return dormant_users