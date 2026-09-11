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

        # Safe schema migrations for attendance and sync_status
        try:
            from sqlalchemy import inspect
            insp = inspect(engine)
            if "attendance" in insp.get_table_names():
                cols = [c["name"] for c in insp.get_columns("attendance")]
                if "student_id" not in cols:
                    conn.execute(text("ALTER TABLE attendance ADD COLUMN student_id VARCHAR(50)"))
                if "status" not in cols:
                    conn.execute(text("ALTER TABLE attendance ADD COLUMN status VARCHAR(20) DEFAULT 'PRESENT'"))
            if "sync_status" not in insp.get_table_names():
                conn.execute(text("""
                    CREATE TABLE IF NOT EXISTS sync_status (
                        integration_name VARCHAR(50) PRIMARY KEY,
                        last_sync_time TIMESTAMP,
                        last_sync_status VARCHAR(20),
                        records_synced INT DEFAULT 0,
                        details TEXT,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                """))
        except Exception as e:
            print(f"Migration note: {e}")

        conn.commit()

if __name__ == "__main__":
    seed_database()
    print("Database seeded successfully.")
