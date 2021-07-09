using Microsoft.EntityFrameworkCore.Migrations;

namespace ConcealedCommunication.Migrations
{
    public partial class messageiv : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IV",
                table: "Message",
                type: "longtext",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IV",
                table: "Message");
        }
    }
}
