import pickle as pkl
import sys

if len(sys.argv) != 8:  # 7 arguments plus the script name itself
    sys.stderr.write("Error: Expected 7 arguments (nitrogen, phosphorus, potassium, temperature, humidity, pH, rainfall).")
    sys.exit(1)

try:
    # Parse arguments
    nitrogen = float(sys.argv[1])
    phosphorus = float(sys.argv[2])
    potassium = float(sys.argv[3])
    temperature = float(sys.argv[4])
    humidity = float(sys.argv[5])
    ph = float(sys.argv[6])
    rainfall = float(sys.argv[7])

    # Load the model
    with open('F:/SNU Project 24/Project24/ML Model/Crop_&_Fertilizer_Recommendation/Models/RandomForest.pkl', 'rb') as file:
        model = pkl.load(file)
        
        # Prepare data as a 2D array
        data = [[nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall]]
        
        # Predict
        output = model.predict(data)


    crop_dict={
    'rice','maize','chickpea','kidneybeans','pigeonpeas','mothbeans','mungbean','blackgram','lentil','pomegranate',
        'banana','mango','grapes','watermelon','muskmelon','apple','orange', 'papaya','coconut','cotton','jute','coffee'
    }
    if output[0] in crop_dict:  # Check if the predicted crop is in the crop_dict values
        sys.stdout.write(output[0])
    else: 
         sys.stdout.write("Sorry are not able to recommend a proper crop for this environment")

except Exception as e:
    sys.stderr.write(str(e))
    sys.exit(1)
