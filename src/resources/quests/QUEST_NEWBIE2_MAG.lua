QUEST_NEWBIE2_MAG = {
	title = 'IDS_PROPQUEST_INC_002704',
	character = 'MaFl_Newbie',
	end_character = 'MaFl_Newbie',
	start_requirements = {
		min_level = 30,
		max_level = 129,
		job = { 'JOB_MAGICIAN', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_EVE_BXMMAGICIAN45', quantity = 1, sex = 'Male' },
			{ id = 'II_SYS_SYS_EVE_BXFMAGICIAN45', quantity = 1, sex = 'Female' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_NEWBIE02', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002705',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002706',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002707',
		},
		completed = {
			'IDS_PROPQUEST_INC_002708',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002709',
		},
	}
}
