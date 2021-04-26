using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactJokes.Data.Migrations
{
    public partial class addedNumberToJoke : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Number",
                table: "Jokes",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Number",
                table: "Jokes");
        }
    }
}
