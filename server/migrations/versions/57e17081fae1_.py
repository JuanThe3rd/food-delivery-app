"""empty message

Revision ID: 57e17081fae1
Revises: 456890a8c16d
Create Date: 2023-08-24 16:11:44.229447

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '57e17081fae1'
down_revision = '456890a8c16d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('menuitems', schema=None) as batch_op:
        batch_op.add_column(sa.Column('food_type', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('menuitems', schema=None) as batch_op:
        batch_op.drop_column('food_type')

    # ### end Alembic commands ###
