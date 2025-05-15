# Fruit Ripeness Level Classification

## 🎯 Project Overview
A deep learning-based solution for detecting and classifying the ripeness level of fruits and vegetables using YOLOv11s. This project was developed by Team Okra for the Agri Connect Summit Hackathon.

## 🌟 Key Features
- Real-time fruit/vegetable ripeness detection
- Multi-class classification (Ripe, Unripe, Rotten)
- User-friendly Gradio web interface
- High accuracy and performance
- ONNX export support for deployment

## 🔧 Tech Stack
- YOLOv11s for object detection
- Ultralytics framework
- Gradio for web interface
- Python 3.8+

## 📈 Model Performance
Our model achieves excellent results:
- mAP50: 0.847
- mAP50-95: 0.65

Class-wise Performance:
- Ripe: 0.972 mAP50
- Rotten: 0.62 mAP50  
- Unripe: 0.947 mAP50

## ⚡ Quick Start

1. Clone the repository:

A deep learning-based solution for detecting and classifying the ripeness level of fruits and vegetables using YOLOv11s. This project was developed by Team Okra for the Agri Connect Summit Hackathon.

## 🍎 Features

- **Multi-class Classification**: Detects and classifies fruits/vegetables into three categories:
  - Ripe
  - Unripe
  - Rotten

- **Real-time Detection**: Uses YOLOv11s for fast and accurate object detection
- **Web Interface**: Includes a Gradio-based web demo for easy interaction
- **Model Export**: Supports ONNX format for easy deployment

## 📊 Model Performance

The model achieves the following performance metrics on the validation set:
- mAP50: 0.847
- mAP50-95: 0.65
- Class-wise Performance:
  - Ripe: 0.972 mAP50
  - Rotten: 0.62 mAP50
  - Unripe: 0.947 mAP50

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd Fruit-Ripeness-Level-Classification
```

2. Install required packages:
```bash
pip install ultralytics gradio
```

## 🚀 Usage

### Web Demo

Run the Gradio web interface:
```python
python Fruit_Ripeness_Gradio_Demo.ipynb
```

The demo provides a user-friendly interface where you can:
- Upload images of fruits/vegetables
- Get real-time predictions of ripeness levels
- View detection results with bounding boxes and labels

### Model Training

To train the model on your own dataset:

1. Prepare your dataset in YOLO format
2. Update the `dataset.yaml` file with your dataset paths
3. Run training:
```bash
yolo train model=yolo11s.pt data=dataset.yaml epochs=20 imgsz=640
```

### Model Export

Export the model to ONNX format:
```bash
yolo export model=best.pt format=onnx
```

## 📁 Project Structure

```
Fruit-Ripeness-Level-Classification/
├── dataset.yaml           # Dataset configuration
├── Fruit_Ripeness_Classification.ipynb  # Training notebook
├── Fruit_Ripeness_Gradio_Demo.ipynb     # Demo notebook
└── runs/                  # Training results and model weights
```

## 📈 Dataset

The model was trained on a combined dataset from multiple sources:
- Banana Ripeness Dataset
- Orange Dataset
- Tomato Dataset
- Rot Detection Dataset

The dataset includes various fruits and vegetables with annotations for ripeness levels.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Team Okra for developing this solution
- Agri Connect Summit Hackathon organizers
- All dataset providers
