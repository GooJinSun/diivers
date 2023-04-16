import csv


def create_dormant_csv(users):
    csvfile = open('./account/algorithms/dormant_users.csv', 'a')
    writer = csv.writer(csvfile)
    fields = ['id', 'gender', 'date_of_birth', 'ethnicity']

    for user in users:
        row = ""
        for field in fields:
            row += str(getattr(user, field)) + ","
        writer.writerow([c.strip() for c in row.strip(',').split(',')])

    csvfile.close()


def delete_dormant_users_from_csv(users):
    user_ids = list(users.values_list('id', flat=True))

    with open('./account/algorithms/dormant_users.csv', 'r') as csvfile:
        lines = csvfile.readlines()

    csvfile = open('./feed/algorithms/dormant_users.csv', 'w')
    field_info = dict()
    for line in lines:
        user_id = int(line.split(",")[0])
        if user_id not in user_ids:
            csvfile.write(line)
        else:
            field_info[user_id] = line.split(",")[1:]

    csvfile.close()

    return field_info
