QUEST_NEWBIE1_ACR = {
	title = 'IDS_PROPQUEST_INC_002680',
	character = 'MaFl_Newbie',
	end_character = 'MaFl_Newbie',
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
			{ id = 'II_SYS_SYS_EVE_BXMACROBAT15', quantity = 1, sex = 'Male' },
			{ id = 'II_SYS_SYS_EVE_BXFACROBAT15', quantity = 1, sex = 'Female' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_NEWBIE01', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002681',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002682',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002683',
		},
		completed = {
			'IDS_PROPQUEST_INC_002684',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002685',
		},
	}
}
