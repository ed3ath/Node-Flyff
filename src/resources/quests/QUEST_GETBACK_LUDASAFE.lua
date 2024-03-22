QUEST_GETBACK_LUDASAFE = {
	title = 'IDS_PROPQUEST_INC_000831',
	character = 'MaFl_Luda',
	end_character = 'MaFl_Luda',
	start_requirements = {
		min_level = 30,
		max_level = 60,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_FIND_REDBANGT',
	},
	rewards = {
		gold = 0,
		exp = 16250,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_LUDASAFE', quantity = 1, sex = 'Any', remove = true },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_LUDASAFE', monster_id = 'MI_RBANG1', probability = '500000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000832',
			'IDS_PROPQUEST_INC_000833',
			'IDS_PROPQUEST_INC_000834',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000835',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000836',
		},
		completed = {
			'IDS_PROPQUEST_INC_000837',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000838',
		},
	}
}
