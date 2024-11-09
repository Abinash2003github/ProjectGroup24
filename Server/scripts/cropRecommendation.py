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
    with open('F:/SNU Project 24/Project24/ML Model/Crop_&_Fertilizer_Recommendation/Models/model.pkl', 'rb') as file:
        model = pkl.load(file)
        
        # Prepare data as a 2D array
        data = [[nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall]]
        
        # Predict
        output = model.predict(data)


    crop_dict={
    1:'rice', 2:'maize', 3:'chickpea', 4:'kidneybeans',5: 'pigeonpeas',
      6: 'mothbeans',7: 'mungbean',8: 'blackgram',9: 'lentil',10: 'pomegranate',
       11: 'banana',12: 'mango',13: 'grapes',14: 'watermelon', 15:'muskmelon',16: 'apple',
      17: 'orange', 18:'papaya', 19:'coconut', 20:'cotton', 21:'jute',22: 'coffee'
    }
    if output[0] in crop_dict.values():  # Check if the predicted crop is in the crop_dict values
        sys.stdout.write(output[0])
    else: 
         sys.stdout.write("Sorry are not able to recommend a proper crop for this environment")
    # Send the output back to Node.js as a JSON string
    # sys.stdout.write(output[0])

except Exception as e:
    sys.stderr.write(str(e))
    sys.exit(1)
