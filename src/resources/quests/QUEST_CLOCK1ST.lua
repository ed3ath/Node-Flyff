QUEST_CLOCK1ST = {
	title = 'IDS_PROPQUEST_INC_001766',
	character = 'MaDa_DrEst',
	end_character = 'MaFl_DrEstern',
	start_requirements = {
		min_level = 70,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_EXISTDESIRE',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_MONBOOK2', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_MONBOOK1', quantity = 1, sex = 'Any', remove = false },
			{ id = 'II_SYS_SYS_QUE_WARMARK', quantity = 5, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001767',
			'IDS_PROPQUEST_INC_001768',
			'IDS_PROPQUEST_INC_001769',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001770',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001771',
		},
		completed = {
			'IDS_PROPQUEST_INC_001772',
			'IDS_PROPQUEST_INC_001773',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001774',
		},
	}
}
