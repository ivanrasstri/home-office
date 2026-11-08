# Студия LTX-2.5: веб-страница с паролем (видео из текста или кадра). Считает Hugging Face или LTX API,
# поэтому серверу не нужна видеокарта. Railway: Dockerfile path = studio/Dockerfile,
# переменные STUDIO_PASSWORD, STUDIO_USER, HF_TOKEN (и по желанию LTXV_API_KEY), Serverless включён.
FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    GRADIO_ANALYTICS_ENABLED=False

WORKDIR /app
COPY studio/requirements.txt studio/requirements.txt
RUN pip install -r studio/requirements.txt

COPY designer/__init__.py designer/ltx.py designer/ltx_space.py designer/wan_space.py designer/
COPY studio/app.py studio/app.py

RUN python -c "import sys; sys.path.insert(0, '/app'); import designer.ltx, designer.ltx_space, designer.wan_space, gradio, gradio_client" \
 && useradd --create-home --uid 10001 studio
USER studio

EXPOSE 7860
CMD ["python", "studio/app.py"]
