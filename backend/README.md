### Hi!
to launch, please do this command in your terminal6 after venv
```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
```
launch server:
```bash
uvicorn app:app --reload
```
go to 
http://127.0.0.1:8000/standings
in your browser