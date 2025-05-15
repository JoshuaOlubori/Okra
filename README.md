# Okra!

## Project Overview
In Nigeria, millions of tons of food go to waste every year; not because of poor harvests, but because they never make it from farms to markets. To tackle these losses, we present Okra: a data-driven digital marketplace and logistics platform built to seamlessly connect farmers, buyers, and logistics providers in real time.  

Its stand-out feature? An AI-powered tool for predicting freshness and quantity of produce using image recognition, and helping buyers make faster, more informed decisions. Okra also uses data such as rainfall forecasts and harvest schedules to predict high-risk post-harvest loss periods, enabling early interventions like dispatching logistics or alerting farmers.

## 🔧 Tech Stack
- NextJS for the web app
- Tableau (click [here](https://public.tableau.com/views/PostHarvestLossinNigeria/Dashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link) to visit dashboard)
- YOLOv11s for object detection
- Ultralytics framework
- Gradio for web interface
- Python 3.8+

## 📁 Project Structure

```
root/
├── okra_ai_cv_model/           # model files
├── report/  # Latex codes generating report pdf
├── tableau dashboard/     # tableau dashboard files
└── webapp/                  # NextJS app
```