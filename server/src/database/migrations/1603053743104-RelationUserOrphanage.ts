import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class RelationUserOrphanage1603053743104 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'orphanages_sponsors_users',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'orphanage_id',
          type: 'integer',
        },
        {
          name: 'user_id',
          type: 'integer',
        }],
      foreignKeys: [
        {
          name: 'SponsorsOrphanage',
          columnNames: ['orphanage_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'orphanages',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        {
          name: 'SponsorsUsers',
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },

      ]
    }))

    /*         await queryRunner.createForeignKey("orphanages_sponsors_users", new TableForeignKey({
                columnNames: ["orphanage_id"],
    
            })) */
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
