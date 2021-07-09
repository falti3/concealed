using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ConcealedCommunication.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConcealedAddress",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Address = table.Column<string>(type: "longtext", nullable: true),
                    ReadKey = table.Column<string>(type: "longtext", nullable: true),
                    WriteKey = table.Column<string>(type: "longtext", nullable: true),
                    OwnKey = table.Column<string>(type: "longtext", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConcealedAddress", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServerOptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EncryptKey = table.Column<string>(type: "longtext", nullable: true),
                    DecryptKey = table.Column<string>(type: "longtext", nullable: true),
                    SignKey = table.Column<string>(type: "longtext", nullable: true),
                    VerifyKey = table.Column<string>(type: "longtext", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServerOptions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Content = table.Column<string>(type: "longtext", nullable: true),
                    ConcealedAddressId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Message_ConcealedAddress_ConcealedAddressId",
                        column: x => x.ConcealedAddressId,
                        principalTable: "ConcealedAddress",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "ServerOptions",
                columns: new[] { "Id", "DecryptKey", "EncryptKey", "SignKey", "VerifyKey" },
                values: new object[] { 1, "b", "a", "c", "d" });

            migrationBuilder.CreateIndex(
                name: "IX_Message_ConcealedAddressId",
                table: "Message",
                column: "ConcealedAddressId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Message");

            migrationBuilder.DropTable(
                name: "ServerOptions");

            migrationBuilder.DropTable(
                name: "ConcealedAddress");
        }
    }
}
