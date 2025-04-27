import sys
import torch
from torchvision import transforms
from PIL import Image

# Define device (CUDA if available, else CPU)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load the trained model
def load_model(model_path):
    model = torch.load(model_path, map_location=device, weights_only=False)
    model.eval()  # Set to evaluation mode
    model.to(device)  # Move model to device
    return model

# Preprocess the input image
def preprocess_image(image_path):
    try:
        transform = transforms.Compose([
            transforms.Resize((128, 128)),  # Resize image
            transforms.ToTensor(),  # Convert to tensor
        ])
        image = Image.open(image_path).convert('RGB')  # Ensure RGB format
        image = transform(image)
    except Exception as e:
        print(f"Error: {e}")
        return None
    return image

# Predict the disease based on the image
def predict_image(image_path, model):
    image = preprocess_image(image_path)
    if image is None:
        return "Error processing image"
    
    image = image.unsqueeze(0).to(device)  # Add batch dimension and move to device
    with torch.no_grad():  # No gradient calculation needed
        outputs = model(image)
    
    _, preds = torch.max(outputs, dim=1)  # Get the class with the highest score
    
    # Define class labels (diseases)
    try:
        classes = model.classes
    except AttributeError:
        classes = ['Apple___Apple_scab',
                   'Apple___Black_rot',
                   'Apple___Cedar_apple_rust',
                   'Apple___healthy',
                   'Blueberry___healthy',
                   'Cherry_(including_sour)___Powdery_mildew',
                   'Cherry_(including_sour)___healthy',
                   'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
                   'Corn_(maize)___Common_rust_',
                   'Corn_(maize)___Northern_Leaf_Blight',
                   'Corn_(maize)___healthy',
                   'Grape___Black_rot',
                   'Grape___Esca_(Black_Measles)',
                   'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
                   'Grape___healthy',
                   'Orange___Haunglongbing_(Citrus_greening)',
                   'Peach___Bacterial_spot',
                   'Peach___healthy',
                   'Pepper,_bell___Bacterial_spot',
                   'Pepper,_bell___healthy',
                   'Potato___Early_blight',
                   'Potato___Late_blight',
                   'Potato___healthy',
                   'Raspberry___healthy',
                   'Soybean___healthy',
                   'Squash___Powdery_mildew',
                   'Strawberry___Leaf_scorch',
                   'Strawberry___healthy',
                   'Tomato___Bacterial_spot',
                   'Tomato___Early_blight',
                   'Tomato___Late_blight',
                   'Tomato___Leaf_Mold',
                   'Tomato___Septoria_leaf_spot',
                   'Tomato___Spider_mites Two-spotted_spider_mite',
                   'Tomato___Target_Spot',
                   'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
                   'Tomato___Tomato_mosaic_virus',
                   'Tomato___healthy']
    
    # Return the predicted disease name
    return classes[preds[0].item()]

# Main entry point for accepting the image path from command line argument
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <image_path>")
        sys.exit(1)

    image_path = sys.argv[1]  # Image path from command line argument
    model_path = r'F:/SNU Project 24/Project24/ML Model/Disease_Detection/Models/plant-disease-model-complete.pth'

    # Load model and predict disease
    model = load_model(model_path)
    predicted_disease = predict_image(image_path, model)

    # Output the predicted disease
    print(predicted_disease)
