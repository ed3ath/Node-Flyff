import "reflect-metadata";
import { DataSource } from "typeorm";
import Account from "./database/account";
import Character from "./database/character";
import { GenderType } from "./common/genderType";
import { AuthorityType } from "./common/authorityType";

// Simple script to create test account and character for testing the flow
async function setupTestData() {
  console.log("Setting up test data for nodejs-flyff...");

  // Create a simple in-memory database connection
  const dataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    entities: [Account, Character],
    synchronize: true,
    logging: false,
  });

  try {
    await dataSource.initialize();
    console.log("Database connection initialized");

    const accountRepo = dataSource.getRepository(Account);
    const characterRepo = dataSource.getRepository(Character);

    // Create test account
    let testAccount = await accountRepo.findOne({
      where: { username: "test" },
    });

    if (!testAccount) {
      testAccount = new Account();
      testAccount.username = "test";
      testAccount.password = "test";
      testAccount.authority = AuthorityType.Administrator; // Admin level for testing
      testAccount.verified = true; // Make sure account is verified
      testAccount.banned = false; // Make sure account is not banned
      testAccount.deleted = false; // Make sure account is not deleted
      testAccount = await accountRepo.save(testAccount);
      console.log(`Created test account: ${testAccount.username} (ID: ${testAccount.id})`);
    } else {
      console.log(`Test account already exists: ${testAccount.username} (ID: ${testAccount.id})`);
    }

    // Create test character
    let testCharacter = await characterRepo.findOne({
      where: { name: "testchar", account: { id: testAccount.id } },
    });

    if (!testCharacter) {
      testCharacter = new Character();
      testCharacter.account = testAccount;
      testCharacter.name = "testchar";
      testCharacter.slot = 0;
      testCharacter.level = 15;
      testCharacter.jobId = 0; // Vagrant
      testCharacter.gender = GenderType.Male;
      testCharacter.strength = 15;
      testCharacter.stamina = 15;
      testCharacter.dexterity = 15;
      testCharacter.intelligence = 15;
      testCharacter.statPoints = 0;
      testCharacter.skillPoints = 0;
      testCharacter.experience = 0;
      testCharacter.gold = 100000; // Start with some gold
      testCharacter.mapId = 1; // Madrigal
      testCharacter.positionX = 6968.0;
      testCharacter.positionY = 3328.0;
      testCharacter.positionZ = 0.0;
      testCharacter.hairId = 1;
      testCharacter.hairColor = 0xFFD700; // Gold
      testCharacter.faceId = 1;
      testCharacter.skinSetId = 11; // Male skin
      testCharacter.bankPin = 1234; // Test PIN
      testCharacter.deleted = false;

      testCharacter = await characterRepo.save(testCharacter);
      console.log(`Created test character: ${testCharacter.name} (ID: ${testCharacter.id})`);
    } else {
      console.log(`Test character already exists: ${testCharacter.name} (ID: ${testCharacter.id})`);
    }

    console.log("✓ Test data setup complete!");
    console.log("You can now run the test client with:");
    console.log("  Username: test");
    console.log("  Password: test");
    console.log("  Character: testchar (ID: " + testCharacter.id + ")");
    console.log("  Bank PIN: 1234");

  } catch (error) {
    console.error("Error setting up test data:", error);
  } finally {
    await dataSource.destroy();
  }
}

// Only run if called directly
if (require.main === module) {
  setupTestData().catch(console.error);
}

export { setupTestData };