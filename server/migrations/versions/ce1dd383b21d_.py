"""empty message

Revision ID: ce1dd383b21d
Revises: c980305e91b3
Create Date: 2023-08-30 22:01:43.896876

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ce1dd383b21d'
down_revision = 'c980305e91b3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('past_orders', schema=None) as batch_op:
        batch_op.drop_column('quantities')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('past_orders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('quantities', sa.VARCHAR(), nullable=True))

    # ### end Alembic commands ###