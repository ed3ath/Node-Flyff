QUEST_MINIWHEEL = {
	title = 'IDS_PROPQUEST_INC_002264',
	character = 'MaFl_MiniWheel',
	end_character = 'MaFl_MiniWheel',
	start_requirements = {
		min_level = 1,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_CHR_FOO_COO_REMANTIS', quantity = 10, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_SCR_MINIWHEEL', quantity = 200, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002265',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002266',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002267',
		},
		completed = {
			'IDS_PROPQUEST_INC_002268',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002269',
		},
	}
}
