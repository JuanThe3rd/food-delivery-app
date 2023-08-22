"""makes inputs non-nullable

Revision ID: 4e4a32939cf0
Revises: 6bb9075223dc
Create Date: 2023-08-22 15:26:13.792002

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4e4a32939cf0'
down_revision = '6bb9075223dc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('logins', schema=None) as batch_op:
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('user_type',
               existing_type=sa.VARCHAR(),
               nullable=False)

    with op.batch_alter_table('restaurants', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('image',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('owner',
               existing_type=sa.VARCHAR(),
               nullable=False)

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.alter_column('content',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('review_type',
               existing_type=sa.VARCHAR(),
               nullable=False)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('profile_pic',
               existing_type=sa.VARCHAR(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('profile_pic',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=True)

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.alter_column('review_type',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('content',
               existing_type=sa.VARCHAR(),
               nullable=True)

    with op.batch_alter_table('restaurants', schema=None) as batch_op:
        batch_op.alter_column('owner',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('image',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=True)

    with op.batch_alter_table('logins', schema=None) as batch_op:
        batch_op.alter_column('user_type',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(),
               nullable=True)

    # ### end Alembic commands ###
