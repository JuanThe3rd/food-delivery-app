"""adds menu model

Revision ID: 456890a8c16d
Revises: c87756666533
Create Date: 2023-08-24 15:48:57.552959

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '456890a8c16d'
down_revision = 'c87756666533'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('menuitems',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('item', sa.String(), nullable=True),
    sa.Column('image', sa.String(), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('restaurant_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], name=op.f('fk_menuitems_restaurant_id_restaurants')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('menuitems')
    # ### end Alembic commands ###
