"""empty message

Revision ID: d65ddde46571
Revises: a3ba098e63d7
Create Date: 2023-08-31 00:50:38.162554

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd65ddde46571'
down_revision = 'a3ba098e63d7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pastorders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('restaurant_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_pastorders_restaurant_id_restaurants'), 'restaurants', ['restaurant_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_pastorders_user_id_users'), 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pastorders', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_pastorders_user_id_users'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_pastorders_restaurant_id_restaurants'), type_='foreignkey')
        batch_op.drop_column('restaurant_id')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###
