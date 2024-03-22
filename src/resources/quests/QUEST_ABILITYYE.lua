QUEST_ABILITYYE = {
	title = 'IDS_PROPQUEST_INC_001789',
	character = 'MaFl_DrEstly',
	end_character = 'MaDa_DarMayor',
	start_requirements = {
		min_level = 70,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_CLOCK2ND',
	},
	rewards = {
		gold = 0,
		exp = 36778455,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_MONBOOK1', quantity = 1, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_QUE_MONBOOK2', quantity = 1, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_QUE_MONBOOK3', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_CLOCKS', quantity = 1 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001790',
			'IDS_PROPQUEST_INC_001791',
			'IDS_PROPQUEST_INC_001792',
			'IDS_PROPQUEST_INC_001793',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001794',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001795',
		},
		completed = {
			'IDS_PROPQUEST_INC_001796',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001797',
		},
	}
}
