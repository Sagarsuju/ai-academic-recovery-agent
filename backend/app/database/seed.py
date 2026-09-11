import os
from sqlalchemy import text
from app.database.database import engine, Base

def seed_database():
    Base.metadata.create_all(bind=engine)

    # Path to schema.sql and seed_data.sql
    current_dir = os.path.dirname(os.path.abspath(__file__))
    candidates = [
        os.path.abspath(os.path.join(current_dir, "..", "..", "database")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..", "database")),
        "/app/database"
    ]
    schema_path = ""
    seed_path = ""
    for c in candidates:
        cand_schema = os.path.join(c, "schema.sql")
        if os.path.exists(cand_schema):
            schema_path = cand_schema
            seed_path = os.path.join(c, "seed_data.sql")
            break

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
