QUEST_SCE_REASONCONDIV = {
	title = 'IDS_PROPQUEST_SCENARIO_INC_000314',
	character = 'MaFl_Martinyc',
	end_character = 'MaFl_Martinyc',
	start_requirements = {
		min_level = 20,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_SCE_BEGINDOUT',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_PRFCONDIV', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_FLASTONE', quantity = 5, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_QUE_SAINSTONE', quantity = 5, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_QUE_DARSTONE', quantity = 5, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_SCENARIO_INC_000315',
			'IDS_PROPQUEST_SCENARIO_INC_000316',
			'IDS_PROPQUEST_SCENARIO_INC_000317',
			'IDS_PROPQUEST_SCENARIO_INC_000318',
			'IDS_PROPQUEST_SCENARIO_INC_000319',
		},
		begin_yes = {
			'IDS_PROPQUEST_SCENARIO_INC_000320',
		},
		begin_no = {
			'IDS_PROPQUEST_SCENARIO_INC_000321',
		},
		completed = {
			'IDS_PROPQUEST_SCENARIO_INC_000322',
			'IDS_PROPQUEST_SCENARIO_INC_000323',
		},
		not_finished = {
			'IDS_PROPQUEST_SCENARIO_INC_000324',
		},
	}
}
