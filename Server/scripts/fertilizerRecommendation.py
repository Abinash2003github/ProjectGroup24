import pickle as pkl
import sys

try:
    # Parse arguments
    # nitrogen = float(sys.argv[1])
    # phosphorus = float(sys.argv[2])
    # potassium = float(sys.argv[3])
    # temperature = float(sys.argv[4])
    # # humidity = float(sys.argv[5])
    # crop_name = sys.argv[6]

    nitrogen = float(sys.argv[1])
    phosphorus = float(sys.argv[2])
    potassium = float(sys.argv[3])
    humidity = float(sys.argv[4])
    moisture = float(sys.argv[5])
    temperature = float(sys.argv[6])
    soil_type = sys.argv[7]
    crop_name = sys.argv[8]


    crop_dict={'Barley': 0, 'Cotton': 1, 'Ground Nuts': 2, 'Maize': 3, 'Millets': 4, 'Oil seeds': 5, 'Paddy': 6, 'Pulses': 7, 'Sugarcane': 8, 'Tobacco': 9, 'Wheat': 10}
    soil_dict={'Black': 0, 'Clayey': 1, 'Loamy': 2, 'Red': 3, 'Sandy': 4}
    fert_dict={'10-26-26': 0, '14-35-14': 1, '17-17-17': 2, '20-20': 3, '28-28': 4, 'DAP': 5, 'Urea': 6}
    # Load the model
    with open('F:/SNU Project 24/Project24/ML Model/Fertilizer_Recommendation/Models/RandomForest.pkl', 'rb') as file:
        model = pkl.load(file)
        
        # Prepare data as a 2D array
        data = [[temperature,humidity,moisture,soil_dict[soil_type], crop_dict[crop_name], nitrogen, potassium, phosphorus]]        
        
        # Predict
        output = model.predict(data)

    # Find Fertilizer Name
    value_to_find = output[0]
    key = [k for k, v in fert_dict.items() if v == value_to_find][0]

    sys.stdout.write(key)
    # print(output[0])

except Exception as e:
    sys.stderr.write(str(e))
    sys.exit(1)
