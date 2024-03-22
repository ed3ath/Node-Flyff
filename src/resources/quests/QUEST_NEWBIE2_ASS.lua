QUEST_NEWBIE2_ASS = {
	title = 'IDS_PROPQUEST_INC_002688',
	character = 'MaFl_Newbie',
	end_character = 'MaFl_Newbie',
	start_requirements = {
		min_level = 30,
		max_level = 129,
		job = { 'JOB_ASSIST', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_EVE_BXMASSIST45', quantity = 1, sex = 'Male' },
			{ id = 'II_SYS_SYS_EVE_BXFASSIST45', quantity = 1, sex = 'Female' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_NEWBIE02', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002689',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002690',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002691',
		},
		completed = {
			'IDS_PROPQUEST_INC_002692',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002693',
		},
	}
}
