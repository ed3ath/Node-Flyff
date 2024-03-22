QUEST_CLOCK2ND = {
	title = 'IDS_PROPQUEST_INC_001777',
	character = 'MaFl_DrEstern',
	end_character = 'MaFl_DrEstly',
	start_requirements = {
		min_level = 70,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_CLOCK1ST',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_MONBOOK3', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_MONBOOK1', quantity = 1, sex = 'Any', remove = false },
			{ id = 'II_SYS_SYS_QUE_MONBOOK2', quantity = 1, sex = 'Any', remove = false },
			{ id = 'II_SYS_SYS_QUE_WOUNDWAR', quantity = 5, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001778',
			'IDS_PROPQUEST_INC_001779',
			'IDS_PROPQUEST_INC_001780',
			'IDS_PROPQUEST_INC_001781',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001782',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001783',
		},
		completed = {
			'IDS_PROPQUEST_INC_001784',
			'IDS_PROPQUEST_INC_001785',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001786',
		},
	}
}
