import json
import random

# Core variables matching our medical architecture layout
wards = ['EMERGENCY_ROOM', 'ICU', 'PEDIATRICS', 'CARDIOLOGY']
first_names = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Elena', 'James', 'Lisa']
last_names = ['Smith', 'Johnson', 'Chang', 'Jenkins', 'Rodriguez', 'Muller', 'Rostova', 'Patel', 'Black']
conditions = ['Acute Chest Pain', 'Post-Op Recovery', 'Observation', 'Respiratory Distress', 'Arrhythmia']

patients = []

# Generate 3,000 distinct patient profiles
for i in range(1, 3001):
    hr = random.randint(50, 140)
    # Medical logic: Out of bounds heart rates trigger an alert state
    severity = 'CRITICAL' if (hr > 110 or hr < 55) else 'STABLE'
    
    patients.append({
        'id': f'p-{1000+i}',
        'name': f'{random.choice(first_names)} {random.choice(last_names)}',
        'age': random.randint(18, 90),
        'ward': random.choice(wards),
        'heartRate': hr,
        'bloodPressure': f'{random.randint(90, 150)}/{random.randint(60, 95)}',
        'condition': random.choice(conditions),
        'severity': severity
    })

# Write the data structured directly into our mock database file
with open('db.json', 'w') as f:
    json.dump({'patients': patients}, f, indent=2)

print('Successfully generated 3,000 enterprise-ready patient logs!')
