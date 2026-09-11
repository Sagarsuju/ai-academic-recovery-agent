import os
from sqlalchemy import text
from app.database.database import engine, Base

def seed_database():
    Base.metadata.create_all(bind=engine)

    # Path to schema.sql and seed_data.sql
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
    schema_path = os.path.join(project_root, "database", "schema.sql")
    seed_path = os.path.join(project_root, "database", "seed_data.sql")

    with engine.connect() as conn:
        if os.path.exists(schema_path):
            with open(schema_path, "r", encoding="utf-8") as f:
                schema_sql = f.read()
                # Split and execute statements
                for statement in schema_sql.split(";"):
                    if statement.strip():
                        try:
                            conn.execute(text(statement))
                        except Exception as e:
                            pass

        if os.path.exists(seed_path):
            with open(seed_path, "r", encoding="utf-8") as f:
                seed_sql = f.read()
                for statement in seed_sql.split(";"):
                    if statement.strip():
                        try:
                            conn.execute(text(statement))
                        except Exception:
                            pass
        conn.commit()

if __name__ == "__main__":
    seed_database()
    print("Database seeded successfully.")
