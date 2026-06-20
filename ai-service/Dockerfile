FROM python:3.13-slim
WORKDIR /app

RUN addgroup --system aiservice && adduser --system --ingroup aiservice aiservice

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN chown -R aiservice:aiservice /app
USER aiservice

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD python -c "import httpx; httpx.get('http://localhost:8000/health')" || exit 1
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
