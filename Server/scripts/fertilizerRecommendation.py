import pickle as pkl
import sys

try:
    # Parse arguments
    nitrogen = float(sys.argv[1])
    phosphorus = float(sys.argv[2])
    potassium = float(sys.argv[3])
    temperature = float(sys.argv[4])
    humidity = float(sys.argv[5])
    crop_name = sys.argv[6]

    crop_dict={'Barley': 0, 'Cotton': 1, 'Ground Nuts': 2, 'Maize': 3, 'Millets': 4, 'Oil seeds': 5, 'Paddy': 6, 'Pulses': 7, 'Sugarcane': 8, 'Tobacco': 9, 'Wheat': 10}

    # Load the model
    with open('F:/SNU Project 24/Project24/ML Model/Fertilizer_Recommendation/Models/RandomForest.pkl', 'rb') as file:
        model = pkl.load(file)
        
        # Prepare data as a 2D array
        data = [[temperature, humidity, crop_dict[crop_name], nitrogen, phosphorus, potassium]]        
        
        # Predict
        output = model.predict(data)

    sys.stdout.write(output[0])
    # print(output[0])

except Exception as e:
    sys.stderr.write(str(e))
    sys.exit(1)
